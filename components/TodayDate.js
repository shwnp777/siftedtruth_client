'use client';

import { useEffect, useState } from 'react';

/** Today's date, rendered on the client so statically built pages stay current. */
export default function TodayDate() {
  const [text, setText] = useState('');
  useEffect(() => {
    setText(
      new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    );
  }, []);
  return <span className="utility-date">{text || ' '}</span>;
}
