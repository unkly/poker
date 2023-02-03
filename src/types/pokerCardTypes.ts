type ore = 'h' | 's' | 'c' | 'd';
type num =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  | '13';
export type card = `${ore}${num}`;
