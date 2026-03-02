/**
 * Converts SRT subtitle format to VTT format which is supported by most browsers.
 */
export function srtToVtt(srtContent: string): string {
  // Add WEBVTT header
  let vtt = 'WEBVTT\n\n';

  // Replace comma in timestamps with dots (00:00:01,500 -> 00:00:01.500)
  vtt += srtContent
    .replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, '$1.$2')
    // Remove sequence numbers (some browsers are picky)
    .replace(/^\d+\r?\n/gm, '');

  return vtt;
}
