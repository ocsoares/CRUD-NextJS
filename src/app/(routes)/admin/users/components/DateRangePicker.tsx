import React, { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export function DateRangePickerComponent() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date: any) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
  };

  // ISSO AQ tá TOTALMENTE ERRADO !!
  const handleApply = () => {
    // Aqui você pode usar as datas selecionadas (startDate e endDate)
    console.log("Data de início:", startDate);
    console.log("Data de término:", endDate);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          marginLeft={4}
          marginTop={4}
          gap={2.5}
        >
          <Grid item xs={12} sm={4}>
            <DatePicker
              label="Data de Início"
              format="DD/MM/YYYY"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DatePicker
              label="Data de Término"
              minDate={startDate}
              value={endDate}
              onChange={handleEndDateChange}
            />
          </Grid>
        </Box>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" ml={4} mt={2} gap={2}>
            <Button variant="contained" color="primary" onClick={handleClear}>
              Limpar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleApply}
              disabled={!startDate || !endDate || startDate > endDate}
            >
              Aplicar
            </Button>
          </Box>
        </Grid>
      </LocalizationProvider>
    </div>
  );
}
