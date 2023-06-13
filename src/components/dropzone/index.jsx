import React from 'react';
import { useDropzone } from 'react-dropzone';

function DropzoneWithoutKeyboard({ handleChange }) {
    const { getRootProps, getInputProps, acceptedFiles, } = useDropzone({
        multiple: false,
        onDrop: files => handleChange(files),
        noKeyboard: true
    });

    return (
        <section className="drop-container">
            <div {...getRootProps({ className: 'dropzone icon-container' })}>
                <input {...getInputProps()} />
                <div className='icon-container'>
                    {
                        acceptedFiles.length ? <div className='text-center'>
                            <i className="fa-solid fa-check drop-icon"></i>
                            <div>{acceptedFiles[0].path} - {acceptedFiles[0].size} bytes</div>
                        </div>
                            : <i className="fa-solid fa-file drop-icon"></i>
                    }
                </div>
            </div>

        </section>
    );
}

export default DropzoneWithoutKeyboard
