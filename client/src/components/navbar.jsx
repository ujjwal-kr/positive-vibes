import { useState } from 'react';
import { createStyles, Navbar, Group, Code } from '@mantine/core';
import { Link } from "react-router-dom"
import NavState from '../state/navState';

import {
    IconAtom,
    IconArticle,
    IconFlag,
    IconActivity,
    IconCpu,
    IconDeviceTvOld,
    IconBallFootball,
    IconLogout,
    IconSettings,
    IconLogin,
    IconUserPlus
} from '@tabler/icons';
import { useRecoilState } from 'recoil';


const data = [
    { link: '/', label: 'Top Stories', icon: IconArticle },
    { link: '/news/india/', label: 'India', icon: IconFlag },
    { link: '/news/health/', label: 'Health', icon: IconActivity },
    { link: '/news/technology/', label: 'Technology', icon: IconCpu },
    { link: '/news/science/', label: 'Science', icon: IconAtom },
    { link: '/news/entertainment/', label: 'Entertainment', icon: IconDeviceTvOld },
    { link: '/news/sports/', label: 'Sports', icon: IconBallFootball },
];

export default function Nav() {
    const { classes, cx } = useNavStyles();
    const [active, setActive] = useRecoilState(NavState);

    const links =  (
        <div>
            <Link
                className={cx(classes.link, { [classes.linkActive]: active === "top stories" })}
                to="/"
            >
                <IconArticle className={classes.linkIcon} stroke={1.5} />
                <span>Top Stories</span>
            </Link>

            <Link
                className={cx(classes.link, { [classes.linkActive]: active === "india" })}
                to="/news/india"
            >
                <IconFlag className={classes.linkIcon} stroke={1.5} />
                <span>India</span>
            </Link>

            <Link
                className={cx(classes.link, { [classes.linkActive]: active === "health" })}
                to="/news/health/"
            >
                <IconActivity className={classes.linkIcon} stroke={1.5} />
                <span>Health</span>
            </Link>

            <Link
                className={cx(classes.link, { [classes.linkActive]: active === "technology" })}
                to="/news/technology"
            >
                <IconCpu className={classes.linkIcon} stroke={1.5} />
                <span>Technology</span>
            </Link>

            <Link
                className={cx(classes.link, { [classes.linkActive]: active === "science" })}
                to="/news/science"
            >
                <IconAtom className={classes.linkIcon} stroke={1.5} />
                <span>Science</span>
            </Link>

            <Link
                className={cx(classes.link, { [classes.linkActive]: active === "entertainment" })}
                to="/news/entertainment"
            >
                <IconDeviceTvOld className={classes.linkIcon} stroke={1.5} />
                <span>Entertainment</span>
            </Link>

            <Link
                className={cx(classes.link, { [classes.linkActive]: active === "sports" })}
                to="/news/sports"
            >
                <IconBallFootball className={classes.linkIcon} stroke={1.5} />
                <span>Sports</span>
            </Link>
        </div>
    );

    return (
        <Navbar height={700} width={{ sm: 300 }} p="md" className={classes.main}>
            <Navbar.Section grow>
                <Group className={classes.header} position="apart">
                    Positive Vibes
                </Group>
                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconSettings className={classes.linkIcon} stroke={1.5} />
                    <span>Settings</span>
                </a>

                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>

                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconLogin className={classes.linkIcon} stroke={1.5} />
                    <span>Login</span>
                </a>

                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconUserPlus className={classes.linkIcon} stroke={1.5} />
                    <span>Sign Up</span>
                </a>
            </Navbar.Section>
        </Navbar>
    );
}

const useNavStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');
    return {
        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
            borderBottom: `1px solid ${theme.colors.dark[4]
                }`,
        },

        main: {
            float: 'left',
        },

        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderTop: `1px solid ${theme.colors.dark[4]
                }`,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: theme.fontSizes.sm,
            color: theme.colors.dark[1],
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            '&:hover': {
                backgroundColor: theme.colors.dark[8],
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,

                [`& .${icon}`]: {
                    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                },
            },
        },

        linkIcon: {
            ref: icon,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
            marginRight: theme.spacing.sm,
        },

        linkActive: {
            '&, &:hover': {
                backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
                    .background,
                color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
                [`& .${icon}`]: {
                    color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
                },
            },
        },
    };
});