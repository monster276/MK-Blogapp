import React, { Fragment } from 'react'
import { BiTrash } from 'react-icons/bi'
const ImageUpload = (props) => {
  const {
    handleDeleteImage = () => {},
    name,
    className = '',
    progress = 0,
    image = '',
    ...rest
  } = props
  return (
    <label
      className={`cursor-pointer flex items-center justify-center bg-gray-100 border border-dashed w-full min-h-[200px] rounded-lg ${className} relative overflow-hidden`}
    >
      <input
        type="file"
        name={name}
        className="hidden-input"
        onChange={() => {}}
        {...rest}
      />
      {progress !== 0 && !image && (
        <div className="loading w-16 h-16 border-8 border-green-500 border-t-transparent animate-spin absolute z-10 rounded-full"></div>
      )}
      {!image && progress === 0 && (
        <div className="flex flex-col items-center text-center pointer-events-none">
          <img
            src="/img-upload.png"
            alt="upload-img"
            className="max-w-[80px] mb-5"
          />
          <p className="font-semibold">Choose photo</p>
        </div>
      )}
      {image && (
        <Fragment>
          <img src={image} className="w-full h-full object-cover" alt="" />
          <button
            className="w-16 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer absolute z-10 text-red-500"
            onClick={handleDeleteImage}
          >
            <BiTrash></BiTrash>
          </button>
        </Fragment>
      )}
      {!image && (
        <div
          className="absolute w-10 h-1 bg-green-400 bottom-0 left-0 transition-all image-upload-progress"
          style={{
            width: `${Math.ceil(progress)}%`,
          }}
        ></div>
      )}
    </label>
  )
}

export default ImageUpload
