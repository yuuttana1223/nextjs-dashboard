'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useQueryState } from 'next-usequerystate';

export default function Search({ placeholder }: { placeholder: string }) {
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const { replace } = useRouter();

  // function handleSearch(term: string) {
  //   const params = new URLSearchParams(searchParams);
  //   if (term) {
  //     params.set('query', term);
  //   } else {
  //     params.delete('query');
  //   }
  //   replace(`${pathname}?${params.toString()}`);
  // }

  const [query, setQuery] = useQueryState('query', {
    shallow: false,
    throttleMs: 1000,
  });
  const [_page, setPage] = useQueryState('page');
  const handleSearch = (value: string) => {
    if (value === '') {
      // queryが空の場合「?query」を削除する
      setQuery(null);
      return;
    }
    setQuery(value);
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          // 検索するときにページを1に戻す
          setPage('1');
          handleSearch(e.target.value);
        }}
        // defaultValue={searchParams.get('query')?.toString()}
        value={query ?? ''}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
