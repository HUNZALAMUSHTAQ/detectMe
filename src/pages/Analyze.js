import React, { useState } from 'react'
import Navbar from './Navbar'
import Webcam from "react-webcam";
import { Button, Modal, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const videoConstraints = {
    width: 400,
    height: 400,
    facingMode: "user"
};
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#fff',
    border: '2px solid #fff',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
};

function Capture() {
    const [picture, setPicture] = useState('')
    const [loading, setLoading] = useState(false)
    const [alert, showAlert] = useState(false)
    const [errorText, setErrorText] = useState('')



    const webCamRef = React.useRef(null)
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        showAlert(false)
        setOpen(false)
    };



    function b64toBlob(dataURI) {

        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);

        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
    }

    const handleFileUploading = () => {
        setLoading(true)
        const data = new FormData()
        const imageBlob = b64toBlob(picture)
        data.append('img', imageBlob)
        axios.post('http://18.130.175.129:8000/api/faceVer', data, { "Content-Type": "multipart/form-data" }).then(res => {
            console.log(res)
            setErrorText(res.data.status)
            showAlert(true)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
            setErrorText(err.message)
            showAlert(true)
        })

    }
    const capture = React.useCallback(() => {
        const pictureSrc = webCamRef.current.getScreenshot()
        setPicture(pictureSrc)
        console.log(picture)
    })

    const uploadHandler = () => {
        setOpen(true)
    }

    const captureClickHandler = (e) => {
        e.preventDefault()
        capture()

    }
    return (
        <div>
            <Navbar />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h4>Preview</h4>
                    {alert && <Alert severity="info">{errorText}</Alert>}
                    {loading && <h1>Loading ...</h1>}

                    {picture && <img src={picture} />}
                    {!picture && <h1>Please Capture some picture</h1>}

                    <Stack mt={4}>
                        <Button disabled={picture == '' ? true : false} variant="contained" onClick={handleFileUploading} component="label">
                            Upload
                        </Button>
                    </Stack>

                </Box>
            </Modal>
            <Stack alignItems='center' >
                <Webcam
                    audio={false}
                    height={400}
                    screenshotFormat="image/jpeg"
                    width={400}
                    videoConstraints={videoConstraints}
                    ref={webCamRef}
                ></Webcam>
            </Stack>
            <Stack mt={2} direction="row" justifyContent='center' alignItems="center" spacing={2}>
                <Button variant="contained" onClick={captureClickHandler} component="label">
                    Capture
                </Button>
                <Button variant="contained" onClick={uploadHandler} component="label">
                    Upload
                </Button>
            </Stack>
        </div>
    )
}

export default Capture
