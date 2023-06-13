const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const pool = require('./config/db.config');
const router = require('./routes/routes');
const employeeRouter = require('./routes/employee_details');
const invoiceRouter = require('./routes/invoice_data');
const clientRouter = require('./routes/clients');
const aboutDetailsRouter = require('./routes/about');
const contactUsRouter = require('./routes/contactus');
const linkDetails = require('./routes/links_details');
const MenuFromDetails = require('./routes/menu_title');
const metaForm = require('./routes/meta_form');
const trainingInfra = require('./routes/training_infra');
const projectsRouter = require('./routes/projects');
const serviceRouter = require('./routes/services');
const sliderDetailsRouter = require('./routes/slider_details');
const teamDetailsRouter = require('./routes/team_details');

const app = express();
const PORT = 5000;

app.use(cors());

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/images', express.static('pictures'))

app.use('/api/about-details' ,aboutDetailsRouter)
app.use('/api/employee-details', employeeRouter);
app.use('/api/invoice-data', invoiceRouter);
app.use('/api/clients', clientRouter);
app.use('/api/contact-us', contactUsRouter);
app.use('/api/links-details', linkDetails);
app.use('/api/menu-title-details', MenuFromDetails);
app.use('/api/meta-form', metaForm);
app.use('/api/training-infra', trainingInfra);
app.use('/api/projects', projectsRouter);
app.use('/api/services', serviceRouter);
app.use('/api/slider-details', sliderDetailsRouter);
app.use('/api/team-details', teamDetailsRouter);

app.listen(PORT, () => {
    console.log(`Port Running on http://localhost:${PORT}`);
});