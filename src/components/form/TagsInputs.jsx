import { useState } from 'react'

function TagsInput({ tags, setTags }) {

    function handleKeyDown(e) {
        if (e.key !== 'Enter') return
        const value = e.target.value
        if (!value.trim()) return
        setTags([...tags, value])
        e.target.value = ''
    }

    function removeTag(index) {
        setTags(tags.filter((el, i) => i !== index))
    }

    return (
        <div className="tags-input-container">
            {tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <i onClick={() => removeTag(index)} className='bx bxs-checkbox-minus'></i>
                </div>
            ))}
            <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="Ingresa el numero de tus contenedores" />
        </div>
    )
}

export default TagsInput