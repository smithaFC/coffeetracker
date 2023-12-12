'use client';
import { AppBar, Box, Stack, Typography } from '@mui/material';
import Link from 'next/link';

export default function NavigationBar() {
	return (
		<AppBar position='static' sx={{ background: 'linear-gradient(to left, #1f993d, #391c66)' }}>
			<Stack width='100%' direction={'row'} justifyContent={'flex-start'} alignItems={'center'}>
				<Typography sx={{ px: '4px' }}>FullCount Coffee Tracker v1.1</Typography>
				<Box sx={{ transform: 'skew(14deg)', borderLeft: 1, padding: '8px' }}>
					<Link href='/'>Home</Link>
				</Box>

				<Box sx={{ transform: 'skew(14deg)', borderLeft: 1, borderRight: 1, padding: '8px' }}>
					<Link href='/analytics'>Analytics</Link>
				</Box>
			</Stack>
		</AppBar>
	);
}
