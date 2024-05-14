export default function ExamDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <div>My Post: {params.slug}</div>;
}
