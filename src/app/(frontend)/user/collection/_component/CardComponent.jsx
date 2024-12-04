import { Button } from '@/components/ui/button';
import React, { useRef, useState } from 'react'

function CardComponent({product}) {
    const [showCartButton, setShowCartButton] = useState(false)
    let [cartValue, setCartValue] = useState(0);

    const handleAddToCart = (type) =>{ 
        if(type === 'minus' && cartValue > 0){
            setCartValue(cartValue - 1);
        }else if(type === 'plus'){
            setCartValue(cartValue + 1);
        }
    };

    const hanldeShowCartButton = (type) => {
        setShowCartButton(true)
    }

  return (
    <div
        key={product._id}
        className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
        <img
        src={product.productImages[0]}
        alt={product.productName}
        className="w-full h-48 object-cover"
        />
        <div className="p-4">
        <h4 className="font-semibold text-lg text-gray-800 mb-2">
            {product.productName}
        </h4>
        <p className="text-sm text-gray-600 mb-1">
            {product.CategoryId?.name}
        </p>
        <p className="text-sm text-gray-800 font-bold">
            ${product.price}{" "}
            {product.discount > 0 && (
            <span className="text-sm text-green-600 ml-2">
                ({product.discount}% OFF)
            </span>
            )}
        </p>
        </div>
        <div className="px-4 py-2 bg-gray-100 flex items-center justify-between">
        {product.isAvailable ? (
            <span className="text-sm text-green-600">Available</span>
        ) : (
            <span className="text-sm text-red-600">Out of Stock</span>
        )}

        {
            showCartButton == false ? (
                <Button className="bg-white text-green hover:bg-green" onClick={hanldeShowCartButton}>Add</Button>
            ) : (
                <div className="flex items-center bg-white border border-gray-300 rounded-md shadow-sm w-24 justify-between px-2 py-1">
                    <button
                        className="text-red-500 hover:bg-red-100 w-6 h-6 flex items-center justify-center rounded-full transition duration-200"
                        onClick={() => handleAddToCart('minus')} >
                        -
                    </button>

                    <span className="text-gray-800 font-medium">{cartValue}</span>

                    <button
                        className="text-green-500 hover:bg-green-100 w-6 h-6 flex items-center justify-center rounded-full transition duration-200"
                        onClick={() => handleAddToCart('plus')} >
                        +
                    </button>
                </div>
            )
        }
        

        </div>
    </div>
  )
}

export default CardComponent