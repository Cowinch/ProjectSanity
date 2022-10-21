import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const Feed = () => {
    //const for the loading spinner icon (defaults false)
    const [loading, setLoading] = useState(false)
    const [pins, setPins] = useState(null)

    const { categoryId } = useParams()

    useEffect(() => {
        //we start the loading icon once we start searching
        setLoading(true)
        if (categoryId) {
            const query = searchQuery(categoryId)

            client.fetch(query)
                .then((data) => {
                    setPins(data)
                    //when the fetch is complete, we set loading back to false
                    setLoading(false)
                })
        } else {
            client.fetch(feedQuery)
                .then((data) => {
                    setPins(data)
                    //when the fetch is complete, we set loading back to false
                    setLoading(false)
                })
        }
    }, [categoryId])


    if (loading) return <Spinner message="We are adding new ideas to your feed!" />

    if(!pins?.length) return <h1 className='text-center mt-5 text-bold'>No pins available</h1>
    return (
        <div>
            {pins && <MasonryLayout pins={pins} />}
        </div>
    )
}

export default Feed