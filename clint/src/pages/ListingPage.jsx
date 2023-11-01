import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';


const ListingPage = () => {
    const params = useParams();
    const [listings, setListings] = useState({})

    //====== Loading Post Data Here ======//
    useEffect(() => {
        (async () => {
            const res = await fetch(`/api/posts/${params.id}`)
            const json = await res.json();
            if (json.success === false) {
                toast.error(json.message, {
                    autoClose: 2000,
                })
            }
            else {
                setListings(json)
            }
        })()
    }, [])


    console.log(listings);


    return (
        <div className="listing_section">
            <div className="container">
<img src="" alt="" />
            </div>
            <ToastContainer />
        </div>
    )
}

export default ListingPage