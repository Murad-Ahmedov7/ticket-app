import { useEffect, useMemo, useState } from 'react';
import Icon from '../common/Icons.jsx';

export default function CompaniesView({
  companies,
  onCreate,
  onEdit,
  isActive
}) {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('az');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setIsVisible(false);
      return;
    }

    // əvvəl gizlədirik
    setIsVisible(false);

    // sonra növbəti frame-də animasiyanı başladırıq
    const frame1 = requestAnimationFrame(() => {
      const frame2 = requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => cancelAnimationFrame(frame2);
    });

    return () => cancelAnimationFrame(frame1);
  }, [isActive]);

  const filteredCompanies = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = companies.filter((company) =>
      company.name?.toLowerCase().includes(query) ||
      company.address?.toLowerCase().includes(query) ||
      company.phone?.toLowerCase().includes(query) ||
      company.email?.toLowerCase().includes(query)
    );

    return [...filtered].sort((a, b) => {
      const first = a.name?.toLowerCase() || '';
      const second = b.name?.toLowerCase() || '';

      return sortOrder === 'az'
        ? first.localeCompare(second)
        : second.localeCompare(first);
    });
  }, [companies, search, sortOrder]);

  // qalan kod əvvəlki kimi...
}