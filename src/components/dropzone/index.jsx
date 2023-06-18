import React from 'react';
import { useDropzone } from 'react-dropzone';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DropzoneWithoutKeyboard({ handleChange, show, toggle }) {
    const { getRootProps, getInputProps, acceptedFiles} = useDropzone({
        multiple: false,
        onDrop: files => handleChange(files),
        noKeyboard: true
    });

    return (
        <Modal
            show={show}
            onHide={toggle}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Subir Archivo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <section className="drop-container">
                    <div {...getRootProps({ className: 'dropzone icon-container' })}>
                        <input {...getInputProps()} />
                        <div className='icon-container'>
                            {
                                acceptedFiles.length ? <div className='text-center'>
                                    <i className="fa-solid fa-check drop-icon"></i>
                                    <div>{acceptedFiles[0].path} - {acceptedFiles[0].size} bytes</div>
                                </div>
                                    :

                                    <div className='text-center'>
                                        <i className="fa-solid fa-file drop-icon"></i>
                                        <div className='my-2'>Presiona o suelta tu archivo aqui</div>
                                    </div>

                            }
                        </div>
                    </div>

                </section>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={toggle}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DropzoneWithoutKeyboard
