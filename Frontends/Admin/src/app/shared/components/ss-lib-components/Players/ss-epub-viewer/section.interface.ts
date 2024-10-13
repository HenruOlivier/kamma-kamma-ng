/**
 * Represents a section/chapter in an EPUBjs file.
 */
export interface Section {
  /**
   * The unique index for the section.
   */
  index: number;
  /**
   * The last page they viewed.
   */
  lastPage: number;
  /**
   * The total number of pages in the section.
   */
  totalPages: number;

  /**
   * The pages that the user has viewed.
   */
  viewedPages: number[];
}
