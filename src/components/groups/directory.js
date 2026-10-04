export const normalize = (value = "") => value.trim().toLocaleLowerCase("az");

export function matchingMembers(group, search) {
  const query = normalize(search);
  return !query || normalize(group.name).includes(query)
    ? group.members
    : group.members.filter(member => normalize(member).includes(query));
}

export function filterGroups(groups, { search = "", groupFilter = "", sort = "az" } = {}) {
  const query = normalize(search);
  return groups
    .filter(group => (!groupFilter || String(group.id) === groupFilter)
      && (!query || normalize(group.name).includes(query)
        || matchingMembers(group, query).length > 0))
    .sort((a, b) => {
      const nameOrder = a.name.localeCompare(b.name, "az");
      if (sort === "za") return -nameOrder;
      if (sort === "most") return b.members.length - a.members.length || nameOrder;
      if (sort === "least") return a.members.length - b.members.length || nameOrder;
      return nameOrder;
    });
}
