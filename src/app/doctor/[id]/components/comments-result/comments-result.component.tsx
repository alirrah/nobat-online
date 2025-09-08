"use client";

import { ReactNode, useContext } from "react";

import { CommentsContext } from "@/app/doctor/[id]/providers/comments/comments.provider";

import MingcuteUserFill from "@/icons/MingcuteUserFill";

import { convertDateTime } from "@/utils/date-time.util";

import styles from "./comments-result.module.css";

export default function CommentsResultComponent(): ReactNode {
  const { filteredComments } = useContext(CommentsContext);

  return (
    <ul className={styles["comments-result"]}>
      {filteredComments.map((comment) => (
        <li key={comment.id}>
          <div>
            <div>
              <MingcuteUserFill className={styles.profile} />
              <div>
                <b>{comment.author}</b>
                <p className={styles["date-time"]}>
                  {convertDateTime(comment.dateTime)}
                </p>
              </div>
            </div>
            <p className={styles.rate}>{Math.round(comment.rate * 10) / 10}</p>
          </div>
          <p className={styles.description}>{comment.description}</p>
        </li>
      ))}
    </ul>
  );
}
