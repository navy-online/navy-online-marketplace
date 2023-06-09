import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import CollectionPage from "../components/pages/Collection/CollectionPage";
import SkeletonCollectionPage from "../components/ui/skeleton/SkeletonCollectionPage";
import {
  fetchCaptains,
  getCaptains,
  getCaptainsInfo,
  getCaptainsLoadingStatus,
  removeFilterAttributes,
  setBlockchainType,
  setFilterAttributes,
} from "../store/captains";
import { loadFavouritesList } from "../store/favourites";
import { getIsLogIn } from "../store/user";
import localStorageService from "../services/localStorage.service";

const Captains = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogIn = useSelector(getIsLogIn());
  const collectionCaptainsData = useSelector(getCaptains());
  const isLoading = useSelector(getCaptainsLoadingStatus());
  const collectionCaptainsInfo = useSelector(getCaptainsInfo());

  const [currentPage, setCurrentPage] = useState(
    parseInt(location.search?.split("=")[1] || 1)
  );

  const filterNames = ["Common", "Rare", "Epic", "Legendary"];
  const [rarityList, setRarityList] = useState(
    localStorageService.getCollectionFilterRarity() || []
  );
  const [priceOrder, setPriceOrder] = useState("");

  const [marketplaceState, setMarketplaceState] = useState("");
  const [stateSwitch, setStateSwitch] = useState({
    isSale: false,
  });

  const [selectedBlockchain, setSelectedBlockchain] = useState(
    localStorageService.getBlockchainType() || "Venom"
  ); // передаем в диспач запроса коллекции

  const handleSelectedBlockchain = (value) => {
    setSelectedBlockchain(value);
    localStorageService.setBlockchainType(value);
  };

  const handleChangeMarketState = (event) => {
    setStateSwitch({
      ...stateSwitch,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    if (stateSwitch.isSale === true) {
      setMarketplaceState("listed");
    } else {
      setMarketplaceState("");
    }
  }, [stateSwitch]);

  const handleChangeFilter = (event) => {
    const {
      target: { value },
    } = event;
    setRarityList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    setCurrentPage(1);
  };

  const handleChangePrice = (event) => {
    setPriceOrder(event.target.value);
  };

  useEffect(() => {
    dispatch(
      setFilterAttributes({
        marketplaceState,
        rarityList,
        priceOrder,
      })
    );
    // dispatch(setBlockchainType(selectedBlockchain));
    dispatch(fetchCaptains(selectedBlockchain, currentPage));
  }, [
    selectedBlockchain,
    currentPage,
    marketplaceState,
    rarityList,
    priceOrder,
    stateSwitch,
    dispatch,
  ]);

  useEffect(() => {
    if (!isLoading && collectionCaptainsInfo.pages < currentPage) {
      setCurrentPage(1);
      navigate(location.pathname);
    }
  }, [currentPage]);

  useEffect(() => {
    if (isLogIn && !isLoading) dispatch(loadFavouritesList());
  }, [isLogIn, isLoading, dispatch]);

  const handlePageChange = (pageIndex) => {
    if (pageIndex !== currentPage) {
      setCurrentPage(pageIndex);
      dispatch(fetchCaptains(pageIndex));
    }
  };

  const handleClear = () => {
    dispatch(removeFilterAttributes());
    setCurrentPage(1);
    dispatch(fetchCaptains(currentPage));
    setRarityList([]);
    setPriceOrder("");
    setStateSwitch({
      ...stateSwitch,
      isSale: false,
    });
  };

  return !isLoading ? (
    <CollectionPage
      collection={collectionCaptainsData}
      isLoading={isLoading}
      currentPage={currentPage}
      count={collectionCaptainsInfo.count}
      pages={collectionCaptainsInfo.pages}
      pathName={location.pathname}
      onPageChange={handlePageChange}
      filterNames={filterNames}
      rarityList={rarityList}
      onFilterChange={handleChangeFilter}
      onHandleClear={handleClear}
      stateSwitch={stateSwitch}
      onMarketStateChange={handleChangeMarketState}
      priceOrder={priceOrder}
      onChangePrice={handleChangePrice}
      onButtonSelectBlockchain={handleSelectedBlockchain}
    />
  ) : (
    <SkeletonCollectionPage />
  );
};

export default Captains;
