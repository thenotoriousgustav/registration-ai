import Container from '@/components/container';
import CardUjian from '@/components/pilih-ujian/card-ujian';

export default function PilihUjianPage() {
  return (
    <Container className='my-6 '>
      <div className='flex justify-between items-center gap-x-10 '>
        <CardUjian redirect='/verification' />
        <CardUjian redirect='/verification' />
        <CardUjian redirect='/verification' />
      </div>
    </Container>
  );
}
