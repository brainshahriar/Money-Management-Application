import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { DatePicker } from "rsuite";
import './home.css'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DateNavTab({onDateChange}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDateChange = (date) => {
    if (date) {
      // Format the date part (YYYY-MM-DD)
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
  
      // Get the time part (HH:MM:SS)
      const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  
      // Combine date and time in the desired format
      const formattedDateTime = `${formattedDate} ${formattedTime}`;
  
      // Call the function passed from the parent component with the selected date and time
      onDateChange(formattedDateTime);
    }
  };
  
  

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Day" {...a11yProps(0)} />
          <Tab label="Week" {...a11yProps(1)} />
          <Tab label="Month" {...a11yProps(2)} />
          <Tab label="Year" {...a11yProps(3)} />
          <Tab label="Period" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <DatePicker  defaultValue={new Date()}  format="dd.MM.yyyy" onChange={handleDateChange} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Twoa
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Twof
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item Twof
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Item Twof
      </CustomTabPanel>
    </Box>
  );
}
