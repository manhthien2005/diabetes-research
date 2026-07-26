import { LearnHome } from '@/components/LearnHome';

export const metadata = {
  title: 'Học tập · ExploreX',
  description:
    'Hai khoá tự học: Kiến thức Đái tháo đường và Phương pháp NCKH.',
};

export default function LearnPage() {
  return (
    <div>
      <h1 className="page-title">Học tập</h1>
      <p className="page-sub">
        Nền tảng để đọc paper hiểu sâu — học theo chương, tự kiểm tra bằng quiz.
      </p>
      <LearnHome />
    </div>
  );
}
