export default interface IFilterOptions {
    minPrice: number;
    maxPrice: number;
    minRating: number;
    maxRating: number;
    countries: string[];
    minDate: string;
    maxDate: string;
}