type TypeData = 'user' | 'cabinet'
export class DeleteUsersAndCabinetsDto {
  type: TypeData;
  id: number;
}
