import { FC } from 'react';
import { Box, Link } from '@chakra-ui/react';
import { parseISO, format } from 'date-fns';
import NextLink from 'next/link';

import { Table, Tr, Th, Td } from '@/components/Table';
import ISite from '@/interfaces/site';

interface Props {
	sites: ISite[];
}

const SiteTable: FC<Props> = ({ sites }) => {
	return (
		<Table w='full'>
			<thead>
				<Tr>
					<Th>Name</Th>
					<Th>Site Link</Th>
					<Th>Feedback Link</Th>
					<Th>Date Added</Th>
					<Th>{''}</Th>
				</Tr>
			</thead>
			<tbody>
				{sites.map((site) => (
					<Box as='tr' key={site.url}>
						<Td fontWeight='medium'>{site.name}</Td>
						<Td>
							<Link href={site.url} isExternal>
								{site.url}
							</Link>
						</Td>
						<Td>
							<NextLink href='/p/[siteId]' as={`/p/${site.id}`} passHref>
								<Link color='blue.500' fontWeight='medium'>
									View Feedback
								</Link>
							</NextLink>
						</Td>
						<Td>{format(parseISO(site.createdAt), 'PPpp')}</Td>
					</Box>
				))}
			</tbody>
		</Table>
	);
};

export default SiteTable;
