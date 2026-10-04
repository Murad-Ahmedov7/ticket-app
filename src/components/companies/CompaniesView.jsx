import { useMemo, useState } from "react";
import Icon from "../common/Icons.jsx";
import "./CompaniesView.css";

export default function CompaniesView({
  companies,
  onCreate,
  onEdit,
}) {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("az");

  const filteredCompanies = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = companies.filter(
      (company) =>
        company.name?.toLowerCase().includes(query) ||
        company.address?.toLowerCase().includes(query) ||
        company.phone?.toLowerCase().includes(query) ||
        company.email?.toLowerCase().includes(query)
    );

    return [...filtered].sort((a, b) => {
      const first = a.name?.toLowerCase() || "";
      const second = b.name?.toLowerCase() || "";

      return sortOrder === "az"
        ? first.localeCompare(second)
        : second.localeCompare(first);
    });
  }, [companies, search, sortOrder]);

  return (
    <section className="companies-page flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <header className="companies-header">
        <div className="min-w-0">
          <h1>Şirkətlər Siyahısı</h1>
          <p>Platformada qeydiyyatdan keçmiş tərəfdaş və müştəri şirkətlər</p>
        </div>
        <button type="button" onClick={onCreate} className="companies-create">
          <Icon name="plus" className="h-[18px] w-[18px]" />Əlavə et
        </button>
      </header>

      <div className="companies-content">
        <div className="companies-surface">
          <div className="companies-toolbar">
            <p className="companies-count" aria-live="polite" aria-atomic="true">
              <span className="companies-context-icon"><Icon name="companies" /></span>
              <span><strong>{filteredCompanies.length}</strong> şirkət göstərilir</span>
            </p>
            <div className="companies-controls">
              <div className="companies-search">
                <Icon name="search" className="companies-control-icon h-4 w-4" />
                <input
                  type="search"
                  aria-label="Şirkət axtar"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Şirkət axtar..."
                />
                {search && (
                  <button type="button" onClick={() => setSearch("")} aria-label="Axtarışı təmizlə" title="Axtarışı təmizlə" className="companies-clear">
                    <Icon name="close" />
                  </button>
                )}
              </div>
              <div className="companies-sort">
                <Icon name="sort" className="companies-control-icon h-4 w-4" />
                <select aria-label="Şirkətləri sırala" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="az">Ad: A → Z</option>
                  <option value="za">Ad: Z → A</option>
                </select>
                <Icon name="down" className="companies-select-chevron h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          <table className="companies-table" role="table" aria-label="Şirkətlər Siyahısı">
            <colgroup><col className="company-col-name" /><col className="company-col-address" /><col className="company-col-phone" /><col className="company-col-email" /><col className="company-col-action" /></colgroup>
            <thead role="rowgroup">
              <tr role="row">
                <th scope="col" role="columnheader"><span><Icon name="companies" />Şirkət adı</span></th>
                <th scope="col" role="columnheader"><span><Icon name="location" />Ünvan</span></th>
                <th scope="col" role="columnheader"><span><Icon name="phone" />Əlaqə nömrəsi</span></th>
                <th scope="col" role="columnheader"><span><Icon name="mail" />Elektron poçt ünvanı</span></th>
                <th scope="col" role="columnheader" className="company-actions-heading"><span className="justify-center"><Icon name="edit" />Əməliyyat</span></th>
              </tr>
            </thead>
            <tbody role="rowgroup">
              {filteredCompanies.length > 0 ? filteredCompanies.map((company) => (
                <tr key={company.id} role="row" className="company-row">
                  <td role="cell" className="company-identity">
                    <div className="company-name-cell">
                      <span className="company-logo">{company.logo}</span>
                      <span className="company-name">{company.name}</span>
                    </div>
                  </td>
                  <td role="cell" className="company-address">
                    <div className="company-detail"><span className="companies-context-icon"><Icon name="location" /></span><span><span className="company-mobile-label">Ünvan</span>{company.address}</span></div>
                  </td>
                  <td role="cell" className="company-phone">
                    <div className="company-detail"><span className="companies-context-icon"><Icon name="phone" /></span><span><span className="company-mobile-label">Əlaqə nömrəsi</span>{company.phone}</span></div>
                  </td>
                  <td role="cell" className="company-email">
                    <div className="company-detail"><span className="companies-context-icon"><Icon name="mail" /></span><span><span className="company-mobile-label">Elektron poçt ünvanı</span>{company.email}</span></div>
                  </td>
                  <td role="cell" className="company-action">
                    <button type="button" onClick={() => onEdit(company)} title="Redaktə et" aria-label={`${company.name}: Redaktə et`} className="company-edit">
                      <Icon name="edit" className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr role="row" className="companies-empty-row">
                  <td role="cell" colSpan={5}>
                    <div className="companies-empty">
                      <span className="companies-context-icon"><Icon name="search" className="h-5 w-5" /></span>
                      <p>Şirkət tapılmadı</p>
                      <span>Axtarış kriteriyasını dəyiş</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
