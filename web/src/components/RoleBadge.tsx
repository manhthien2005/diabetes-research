import { ROLE_META, type PaperRole } from '@/lib/roles-public';

/**
 * Vai trò của paper trong ĐỀ TÀI ĐÃ CHỐT (QA_LOG Q007 / TO_DO §6).
 * Trục này KHÁC verdict: verdict = chất lượng bài; role = bài này dùng vào việc gì.
 */
export function RoleBadge({
  role,
  note,
  full = false,
}: {
  role: PaperRole | null;
  note?: string | null;
  full?: boolean;
}) {
  if (!role) {
    return <span className="faint" data-tip="Chưa gán vai trò">—</span>;
  }
  const m = ROLE_META[role];
  return (
    <span
      className={`role-badge ${m.cls}`}
      data-tip={note ? `${m.hint}\n\n${note}` : m.hint}
    >
      <span className="role-letter">{m.letter}</span>
      {full ? m.label : <span className="role-label">{m.label}</span>}
    </span>
  );
}
