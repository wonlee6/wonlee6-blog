import React, {useEffect, useRef, useState} from 'react'
import {DatabaseItem} from '../api/portfolio/get-items'
import {Button} from '@mui/material'

export default function Notion() {
  const [product, setProduct] = useState<DatabaseItem[]>([])

  const inputRef = useRef<HTMLInputElement>(null)
  const handleAddItem = () => {
    if (inputRef.current == null || inputRef.current.value == '') {
      alert('이름을 입력해주세요.')
      return
    }
    fetch(`/api/portfolio/add-item?name=${inputRef.current.value}`)
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((err) => alert(err))
  }

  useEffect(() => {
    fetch('/api/portfolio/get-items')
      .then((res) => res.json())
      .then((data) => setProduct(data.items))
  }, [])

  useEffect(() => console.log(product), [product])

  return (
    <section
      className='mt-20 w-3/4 xl:w-8/12 h-full flex justify-center my-0 mx-auto'
      style={{border: '1px solid red'}}>
      <div className='w-full h-full flex flex-col'>
        <div className='mb-12'>
          <input ref={inputRef} type='text' placeholder='name'></input>
          <button onClick={handleAddItem}>Add Item</button>
        </div>
        <div className='w-full h-full'>
          {product &&
            product.map((item) => (
              <div key={item.id}>
                {/* {JSON.stringify(item)} */}
                {item.properties &&
                  Object.entries(item.properties).map(([key, value]) => (
                    <Button
                      key={key}
                      variant='outlined'
                      onClick={() => {
                        fetch(
                          `/api/portfolio/get-detail?pageId=${item.id}&propertyId=${value.id}`
                        )
                          .then((res) => res.json())
                          .then((data) => alert(JSON.stringify(data.detail)))
                      }}>
                      {key}
                    </Button>
                  ))}
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
