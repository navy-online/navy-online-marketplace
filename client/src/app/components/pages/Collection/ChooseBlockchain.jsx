import React from "react";

import { Box } from "@mui/material";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import { cronosIcon } from "../../ui/CronosIcon";
import { venomIcon } from "../../ui/VenomIcon";

const ChooseBlockchain = ({ selectedBlockchain, onButtonSelectBlockchain }) => {
  const blockchainType = [
    {
      value: "Venom",
      label: "Venom",
      icon: venomIcon,
    },
    {
      value: "Cronos",
      label: "Cronos",
      icon: cronosIcon,
    },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "24px",
        mb: "24px",
      }}
    >
      <Box sx={{ typography: "h6" }}>Choose blockchain:</Box>
      <ButtonGroup
        variant="text"
        color="secondary"
        aria-label="text button group"
      >
        {blockchainType.map((type) => (
          <Button
            variant={selectedBlockchain === type.value ? "outlined" : "text"}
            key={`btn_${type.label}`}
            onClick={() => onButtonSelectBlockchain(type.value)}
          >
            {type.icon}
            {type.label}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default ChooseBlockchain;
