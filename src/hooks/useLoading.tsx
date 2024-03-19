import { useState } from 'react'

interface LoaderState{
    isLoading: boolean
    startLoading: () => void
    finishLoading: () => void
}

export function useLoading (){
    const [isLoading, setIsLoading] = useState(false)

    const startLoading = () => {
        setIsLoading(true)
    }

    const finishLoading = () => {
        setIsLoading(false)
    }

    return{
        isLoading,
        startLoading,
        finishLoading
    }
} 