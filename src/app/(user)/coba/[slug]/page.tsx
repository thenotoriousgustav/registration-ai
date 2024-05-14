export default function PageSlug({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>ini slugnya: {params.slug}</h1> <h1>Ini halaman form </h1>
    </div>
  );
}
