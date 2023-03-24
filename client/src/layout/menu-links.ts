import { Link } from '@/types';
import { routes, titleDictionary } from '@/utils/consts';

export const links: Link[] = Object.keys(routes).map(key => ({
  title: titleDictionary[key as keyof typeof titleDictionary],
  href: `/companies?type=${key}`
}));
