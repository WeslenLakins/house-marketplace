import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import Spinner from './Spinner'

function Slider() {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc) => {
        return listings.push({ id: doc.id, data: doc.data() })
      })

      setListings(listings)
      setLoading(false)
    }
    fetchListings()
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    listings && (
      <>
        <p className='exploreHeading'>Recommended</p>

        <Swiper
          style={{ height: '50vh', width: '100%' }} // adjust as needed
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}>
          {listings.slice(0, 5).map((listing, index) => (
            <SwiperSlide
              key={index}
              onClick={() =>
                navigate(`/category/${listing.data.type}/${listing.id}`)
              }
              style={{
                borderRadius: '10px',
                boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
                overflow: 'hidden', // to apply borderRadius to img
              }}>
              <div
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%), url(${listing.data.imageUrls[0]})`,
                  backgroundSize: 'contain', // changed from 'cover' to 'contain'
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '20px',
                }}>
                <p
                  className='swiperSlideText'
                  style={{
                    fontSize: '1.5em',
                    margin: '0',
                    color: '#fff',
                    fontFamily: '"Roboto", sans-serif',
                  }}>
                  {listing.data.name}
                </p>
                <p
                  className='swiperSlidePrice'
                  style={{
                    fontSize: '1.2em',
                    margin: '0',
                    color: '#fff',
                    fontFamily: '"Roboto", sans-serif',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)', // semi-transparent black background
                    padding: '5px',
                    borderRadius: '5px',
                  }}>
                  ${listing.data.discountedPrice ?? listing.data.regularPrice}{' '}
                  {listing.data.type === 'rent' && '/ month'}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  )
}

export default Slider
