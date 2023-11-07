import React, { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { ArrowRightAlt } from "@mui/icons-material";

export function DateRangePicker() {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  // ARRUMAR o Paper lá q ta MUITO Alto !!!!

  const handleStartDateChange = (date: Dayjs | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };

  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const handleApply = () => {
    console.log("Data de início:", startDate);
    console.log("Data de término:", endDate);

    handleClear();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        display={"flex"}
        justifyContent={"center"}
        marginLeft={7}
        marginTop={4}
        gap={1.5}
      >
        <Grid item xs={12} sm={4}>
          <DatePicker
            label="Data de Início"
            format="DD/MM/YYYY"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </Grid>

        <ArrowRightAlt sx={{ mt: 2 }} />

        <Grid item xs={12} sm={4}>
          <DatePicker
            label="Data de Término"
            minDate={startDate}
            format="DD/MM/YYYY"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </Grid>
      </Box>

      <Grid item xs={12}>
        <Box display="flex" justifyContent="center" ml={7} mt={2} gap={2}>
          <Button variant="contained" color="primary" onClick={handleClear}>
            Limpar
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleApply}
            disabled={
              !startDate ||
              !endDate ||
              !startDate.isValid() ||
              !endDate.isValid() ||
              startDate.isAfter(endDate)
            }
          >
            Aplicar
          </Button>
        </Box>
      </Grid>
    </LocalizationProvider>
  );
}
