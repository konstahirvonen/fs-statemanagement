import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { renderHook, act, render, screen, cleanup } from '@testing-library/react'
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom/vitest'
import AnecdoteList from './components/AnecdoteList'
import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './store'

vi.mock("./services/anecdotes", () => ({
    default: {
        getAll: vi.fn(),
        createNew: vi.fn(),
        update: vi.fn(),
    }
}))


beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes:[], filter: "" })
    vi.clearAllMocks()
})

afterEach(() => {
    cleanup()
})

describe("useAnecdoteActions", () => {
    it("initialize loads anecdotes from backend", async () => {
        const mockAnecdotes = [{ id: 1, content: "Test", votes: 1 }]
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

        const {result} = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
        })
        
        const {result: anecdoteResult} = renderHook(() => useAnecdotes())
        expect(anecdoteResult.current).toEqual(mockAnecdotes)
    })

    it("anecdotes ares sorted by votes", async () => {
        const mockAnecdotes = [
            { id: 1, content: "Test1", votes: 1 },
            { id: 2, content: "Test2", votes: 3 },
        ]
        
        useAnecdoteStore.setState({
            anecdotes: mockAnecdotes,
            filter: "all"
        })

       render(
        <AnecdoteList />
       )

       const items = screen.getAllByTestId("anecdote")
       expect(items[0]).toHaveTextContent("Test2")
       expect(items[1]).toHaveTextContent("Test1")
    })

    it("component receives a properly filtered list", async () => {
        const mockAnecdotes = [
            { id: 1, content: "Test1", votes: 1 },
            { id: 2, content: "Test2", votes: 3 },
        ]

        useAnecdoteStore.setState({
            anecdotes: mockAnecdotes,
            filter: "Test1"
        })

       render(
        <AnecdoteList />
       )

       expect(screen.getByText("Test1")).toBeDefined()
       expect(screen.queryByText("Test2")).toBeNull()
    })

    it("voting increases the number of votes", async () => {
        const mockAnecdotes = [
            { id: 1, content: "Test1", votes: 0 }
        ]

        const user = userEvent.setup()

        useAnecdoteStore.setState({
            anecdotes: mockAnecdotes,
            filter: "all"
        })

        anecdoteService.update.mockResolvedValue({
            id: 1,
            content: "Test1",
            votes: 1
        })

       render(
        <AnecdoteList />
       )
    
       expect(screen.getByText("has 0")).toBeDefined()

       await user.click(screen.getByText("vote"))

       expect(screen.getByText("has 1")).toBeDefined()
    })
})