import { DataTable } from "@/components/dashboard/data-table";
import { Applicant, columns } from "./columns";
import { DetailExamCard } from "@/components/dashboard/detail-exam-card";

async function getData(): Promise<Applicant[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      exam_id: "E001",
      user_id: "U001",
      name: "Alice Johnson",
      photo: "https://example.com/photos/alice.jpg",
      id_card_type: "passport",
      id_card_no: "P123456",
      id_card_file: "https://example.com/id_cards/alice_passport.pdf",
      id_card_profile:
        "https://example.com/id_cards/alice_passport_profile.jpg",
      status: "initial",
    },
    {
      id: "2",
      exam_id: "E002",
      user_id: "U002",
      name: "Bob Smith",
      photo: "https://example.com/photos/bob.jpg",
      id_card_type: "driver_license",
      id_card_no: "D654321",
      id_card_file: "https://example.com/id_cards/bob_driver_license.pdf",
      id_card_profile:
        "https://example.com/id_cards/bob_driver_license_profile.jpg",
      status: "approved",
    },
    {
      id: "3",
      exam_id: "E003",
      user_id: "U003",
      name: "Catherine Lee",
      photo: "https://example.com/photos/catherine.jpg",
      id_card_type: "passport",
      id_card_no: "P987654",
      id_card_file: "https://example.com/id_cards/catherine_passport.pdf",
      id_card_profile:
        "https://example.com/id_cards/catherine_passport_profile.jpg",
      status: "initial",
    },
    {
      id: "4",
      exam_id: "E004",
      user_id: "U004",
      name: "David Brown",
      photo: "https://example.com/photos/david.jpg",
      id_card_type: "national_id",
      id_card_no: "N112233",
      id_card_file: "https://example.com/id_cards/david_national_id.pdf",
      id_card_profile:
        "https://example.com/id_cards/david_national_id_profile.jpg",
      status: "rejected",
    },
    {
      id: "5",
      exam_id: "E005",
      user_id: "U005",
      name: "Emily Davis",
      photo: "https://example.com/photos/emily.jpg",
      id_card_type: "passport",
      id_card_no: "P223344",
      id_card_file: "https://example.com/id_cards/emily_passport.pdf",
      id_card_profile:
        "https://example.com/id_cards/emily_passport_profile.jpg",
      status: "approved",
    },
    {
      id: "6",
      exam_id: "E006",
      user_id: "U006",
      name: "Frank Garcia",
      photo: "https://example.com/photos/frank.jpg",
      id_card_type: "driver_license",
      id_card_no: "D445566",
      id_card_file: "https://example.com/id_cards/frank_driver_license.pdf",
      id_card_profile:
        "https://example.com/id_cards/frank_driver_license_profile.jpg",
      status: "initial",
    },
  ];
}

export default async function Detail({ params }: { params: { id: string } }) {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DetailExamCard id={params.id} />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
