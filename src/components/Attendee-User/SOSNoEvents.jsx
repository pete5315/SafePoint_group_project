import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

function NoEvents() {
  // what displays if there are no events to choose from
  return (
    <>
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        display="flex"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h5" gutterBottom>
          First, Select An Event:
        </Typography>
      </Box>
      <br />
      <br />
      <br />
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        display="flex"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
      >
        <FormControl
          variant="filled"
          sx={{ m: 1, minWidth: 222 }}
          style={{ backgroundColor: "aliceblue" }}
        >
          <InputLabel id="event-selector">Event</InputLabel>
          <Select labelId="event-selector" id="event-selector">
            <MenuItem>No Events Available, Try Again Later</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
}

export default NoEvents;
