import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createAnecdote, getAnecdotes, voteAnecdote } from "../request"
import { useNotify } from "./useNotify"

export const useAnecdotes = () => {
    const queryClient = useQueryClient()
    const { notifyInvalidAnecdote } = useNotify()

    const result = useQuery({
        queryKey: ["anecdotes"],
        queryFn: getAnecdotes,
        retry: false
    })

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(["anecdotes"])
            queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote))
        },
        onError: () => {
            notifyInvalidAnecdote()
        }
    })

    const voteAnecdoteMutation = useMutation({
        mutationFn: voteAnecdote,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["anecdotes"] })
        }
    })

    return {
        anecdotes: result.data,
        isPending: result.isPending,
        addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
        voteAnecdote: (anecdote) => voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    }
}