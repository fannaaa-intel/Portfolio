/**
 * Monochrome tech logos from Simple Icons (CC0), rendered at build time.
 * Brand colors are deliberately ignored — icons use currentColor so they
 * follow the light / dark theme.
 * Anything not listed here falls back to a mono text monogram.
 */
import {
  siDart,
  siDotnet,
  siExpo,
  siFlutter,
  siHtml5,
  siCss,
  siJavascript,
  siMysql,
  siOpenjdk,
  siPostgresql,
  siReact,
  siSqlite,
  siSupabase,
  siTypescript,
} from "simple-icons";

export interface TechIcon {
  path: string;
  /** Brand name of the mark actually drawn (for reference) */
  mark: string;
  /** Text-based logo that becomes unreadable at small sizes (skip in tags) */
  wordmark?: boolean;
}

const icon = (si: { path: string; title: string }, wordmark = false): TechIcon => ({
  path: si.path,
  mark: si.title,
  wordmark,
});

const icons: Record<string, TechIcon> = {
  "VB.NET": icon(siDotnet, true),
  Java: icon(siOpenjdk),
  JavaScript: icon(siJavascript),
  TypeScript: icon(siTypescript),
  HTML: icon(siHtml5),
  CSS: icon(siCss),
  Dart: icon(siDart),
  React: icon(siReact),
  "React Native": icon(siReact),
  Expo: icon(siExpo),
  Flutter: icon(siFlutter),
  Supabase: icon(siSupabase),
  MySQL: icon(siMysql, true),
  SQLite: icon(siSqlite),
  PostgreSQL: icon(siPostgresql),
};

export const getTechIcon = (name: string): TechIcon | undefined => icons[name];
