import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Card, Stack, LinearProgress, Box } from '@mui/material';
import { Container, CircularProgress } from '@material-ui/core';
import "./index.css";
import { LoadingButton } from '@mui/lab';
import { Formik, Form, Field, useFormik, FormikProvider } from 'formik';
import * as Yup from 'yup';



const filePaths = [];

const App = () => {
  const schema = Yup.object().shape({
    email: Yup.string().email(),
    firstName: Yup
      .string('Enter your firstname')
      .required('Firstname is required'),
    lastName: Yup
      .string('Enter your lastName')
      .required('LastName is required'),
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
      // same shape as initial values
      console.log('sdfasdfas');
      console.log(values);
    }
  })
  const [files, setFiles] = useState([]);
  const handleFile = (e) => {
    console.log("Click")
    console.log(URL.createObjectURL(e.target.files[0]));
    const newFile = URL.createObjectURL(e.target.files[0]);
    console.log(filePaths);
    setFiles([...files, newFile]);
    console.log(files)
  }
  // const validateEmail = (e) => {
  //   let error;
  //   if (!value) {
  //     error = 'Required';
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
  //     error = 'Invalid email address';
  //   }
  //   return error;
  // }
  const renderProgressBar = () => {
    return (
      <Box display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        zIndex={10000}



      >
        {/* <Stack sx={{ width: '20%', color: 'grey.500' }} spacing={2}>
          <LinearProgress color="secondary" />
          Loading
        </Stack> */}
        <CircularProgress>
          Loading...
        </CircularProgress>
      </Box>
    );
  }

  const renderImage = () => {

  }

  const { handleSubmit, errors, touched, getFieldProps, isValidating, handleChange } = formik


  return (
    <Container maxWidth="lg">
      <FormikProvider value={formik}>
        <Card variant="outlined" style={{ marginTop: '20px', marginInline: "10px" }}>
          <div className="App" style={{ marginTop: '20px' }}>
            <Form onSubmit={handleSubmit}>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '98%',
                margin: '0 1%'
              }}>
                <TextField style={{ flex: 1, marginRight: '1%' }} id="firstName" label="First Name" name={'firstName'} variant="outlined" error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName} onChange={handleChange}
                  value={formik.values.firstName}

                />


                <TextField style={{ flex: 1, marginLeft: '1%' }} id="lastName" name='lastName' label="Last Name" variant="outlined"
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName} onChange={handleChange}
                  value={formik.values.lastName}
                />
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '98%',
                margin: '5px 1% 0'
              }}>
                <TextField multiline
                  rows={4} style={{ flex: 1, }} id="smallDesc" name='smallDesc' label="Small Description" variant="outlined"
                  error={touched.smallDesc && Boolean(errors.smallDesc)}
                  helperText={touched.smallDesc && errors.smallDesc} onChange={handleChange}
                  value={formik.values.smallDesc}

                />
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                width: '98%',
                margin: '5px 1% 0'
              }}>
                <TextField error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  {...getFieldProps("email")}
                  style={{ flex: 1 }} id="outlined-basic" label="Email Address" variant="outlined" onChange={handleChange} />
              </div>
              {files.map((f, i) => <img key={f + '_' + i} src={f} alt={f} />)}
              <div style={{
                display: 'flex',
                justifyContent: 'right',
                width: '98%',
                margin: '5px 0 1%',
              }}>


                <Button variant="contained" component="label">
                  + Add File
                  <input hidden accept="image/*" multiple type="file" onChange={handleFile} />
                </Button>
                <LoadingButton
                  variant="contained"
                  style={{ marginLeft: "10px" }}
                  type="submit"
                >
                  Save
                </LoadingButton>
              </div>


            </Form>
          </div>
        </Card>
      </FormikProvider>

    </Container>
  );
}

export default App;
