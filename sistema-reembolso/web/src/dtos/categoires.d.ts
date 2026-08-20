enum CategoriesAPIEnum {
  Food = "food",
  Others = "others",
  Services = "services",
  Transport = "transport",
  Accommodation = "accomodation",
}

type RefundsPaginationAPIResponse = {
  refunds: RefundAPIResponse[];
  pagination: {
    page: number;
    perPage: number;
    totalRecords: number;
    totalPages: number;
  };
};
