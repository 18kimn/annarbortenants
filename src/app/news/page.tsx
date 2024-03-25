"use client";
import { Email, OutboundLink } from "@/components/OutboundLink";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import styles from "./page.module.css";
import { printFormattedDate } from "@/utils/date";

interface Press {
  Date: Date;
  Title: string;
  Publication: string;
  Link: string;
  Author: string;
}

export default function News() {
  const [press, setPress] = useState<Press[]>([]);

  useEffect(() => {
    fetch("/press_mentions.json")
      .then((res) => res.json())
      .then((data: (Press & { Date: string })[]) => {
        return data
          .map((d) => ({ ...d, Date: new Date(d.Date) }))
          .sort((d1, d2) => Number(d2.Date) - Number(d1.Date));
      })
      .then(setPress);
  }, [setPress]);

  return (
    <Grid container justifyContent="center" className={styles.container}>
      <Grid item className={styles.content}>
        <h1>News and Media</h1>
        <p>
          We&apos;re grateful for local reporting highlighting our work,
          covering both the problems tenants are facing and the solutions that
          collective action can bring.
        </p>
        <p>
          If you&apos;d like to interview one of our members, feature us in a
          story, or otherwise would like to contact the AATU, please email{" "}
          <Email />.
        </p>
        <hr/>
        {press.map((p) => {
          return (
            <Grid container flexDirection='column' key={p.Title} margin='1rem 0'>
              <div className={styles.row}>
                <h2 className={styles.articleTitle}>
                  <OutboundLink href={p.Link}>{p.Title}</OutboundLink>
                </h2>
              </div>
              <Grid>
                {[p.Author, p.Publication, printFormattedDate(p.Date)].filter(s => s).join('  ⋅  ')}
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}
