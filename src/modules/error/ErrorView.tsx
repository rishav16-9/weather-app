interface Props {
  errorMessage: string;
}
export const ErrorView = ({ errorMessage }: Props) => {
  return <p className="text-red-400 font-medium text-lg">{errorMessage}</p>;
};
