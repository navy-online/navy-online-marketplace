import httpService from "./http.service";

const mintEndpoint =
  "mint/venom/0:dbcdf5d43044c8039fc34fcf8e695f10774ef942b10f93bd9c78513761c518de";

const mintService = {
  get: async () => {
    const { data } = await httpService.get(mintEndpoint);
    console.log(data);
    return data;
  },
};
export default mintService;
