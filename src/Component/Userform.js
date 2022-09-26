import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Card, Box, ImageList, ImageListItem } from '@mui/material';
import { Container } from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import { Form, useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';
import zIndex from '@mui/material/styles/zIndex';
import PopupModal from './PopupModal';
import ProgressBar from './ProgressBar';

const Userform = () => {

  const [imageFiles, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const schema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),
    firstName: Yup
      .string('Enter your firstname')
      .required('First name is required'),
    lastName: Yup
      .string('Enter your lastName')
      .required('Last name is required'),
    smallDesc: Yup
      .string('Enter your smallDesc')
      .required('Description is required'),
  })
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: '',
      lastName: '',
      smallDesc: '',
      email: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowModal(!showModal)
      }, 3000);

    }
  })
  const handleClose = () => {
    setShowModal(!showModal);
    formik.resetForm();
    setFiles([]);
  }
  const handleFile = (e) => {

    console.log(URL.createObjectURL(e.target.files[0]));
    const newFile = URL.createObjectURL(e.target.files[0]);

    setFiles([...imageFiles, newFile]);

  }


  const renderImage = () => {

    return (
      <Box
      >
        <ImageList sx={{ width: "100%", height: 300, }}
          variant="quilted"
          cols={2}
          rowHeight={300}

        >
          {imageFiles.map((f, i) => (
            <ImageListItem key={f + '_' + i} sx={{ p: 2 }} >
              <img
                src={f} alt={f}
                p={10}
              />
            </ImageListItem>
          ))}
        </ImageList>

      </Box >
    )

  }



  const { handleSubmit, errors, touched, getFieldProps, handleChange } = formik


  return (
    <Container maxWidth="lg">
      <FormikProvider value={formik}>
        <Card variant="outlined" style={{ marginTop: '200px', marginInline: "10px", alignItems: "center", borderRadius: "15px" }} >
          <div className="App">
            <Form onSubmit={handleSubmit}>
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems='center'
                sx={{
                  backgroundColor: "#1976d2"
                }}
              >
                <Box component="h1" color={"#ffff"}>User Registration Form</Box>
              </Box>
              <Box
                display="flex"
                p={2}
              >
                <TextField style={{ flex: 1, marginRight: '1%' }} id="firstName" label="First Name" name={'firstName'} variant="outlined" error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName} onChange={handleChange}
                  value={formik.values.firstName}

                />


                <TextField style={{ flex: 1, marginLeft: '1%' }} id="lastName" name='lastName' label="Last Name" variant="outlined"
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName} onChange={handleChange}
                  value={formik.values.lastName}
                />
              </Box>
              <Box
                display="flex"
                p={2}
              >
                <TextField multiline
                  rows={4} style={{ flex: 1, }} id="smallDesc" name='smallDesc' label="Small Description" variant="outlined"
                  error={touched.smallDesc && Boolean(errors.smallDesc)}
                  helperText={touched.smallDesc && errors.smallDesc} onChange={handleChange}
                  value={formik.values.smallDesc}

                />
              </Box>
              <Box
                display="flex"
                p={2}
              >
                <TextField error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  {...getFieldProps("email")}
                  style={{ flex: 1 }} id="outlined-basic" label="Email Address" variant="outlined" onChange={handleChange} />
              </Box>
              {imageFiles.length > 0 && renderImage()}
              <Box
                display="flex"
                p={2}
                justifyContent={'right'}
              >


                <Button variant="contained" component="label">
                  + Add Image
                  <input hidden accept="image/*" multiple type="file" onChange={handleFile} />
                </Button>
                <LoadingButton
                  variant="contained"
                  style={{ marginLeft: "10px" }}
                  type="submit"
                >
                  Save
                </LoadingButton>
              </Box>


            </Form>
          </div>
        </Card>
      </FormikProvider>
      <PopupModal onClose={handleClose} show={showModal} />
      {isLoading && <ProgressBar />}
    </Container>
  );
}

export default Userform;
