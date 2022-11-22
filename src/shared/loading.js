import React from 'react'
import "./loading.css"

export default function Loading() {
  return (
    <div className="spinner-border loading" role="status">
      <span className="sr-only">Cargando...</span>
    </div>
  )
}
