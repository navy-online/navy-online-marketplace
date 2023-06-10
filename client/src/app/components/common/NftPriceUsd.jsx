import React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import { useCoinRate } from "../../hooks/useCoinRate";

const NftPriceUsd = ({ blockchainType, price }) => {
  const [venomUsdPrice, cronosUsdPrice, isLoading] = useCoinRate();

  const mintPriceUsd =
    blockchainType === "Cronos"
      ? "$" + (price * cronosUsdPrice.usd).toFixed(2)
      : "$" + (price * venomUsdPrice.usd).toFixed(2);
  return (
    !isLoading && (
      <Box
        sx={{
          typography: "body2",
          fontWeight: "bold",
          color: "secondary.main",
        }}
      >
        {mintPriceUsd}
      </Box>
    )
  );
};

NftPriceUsd.propTypes = {
  price: PropTypes.number,
};

export default NftPriceUsd;
