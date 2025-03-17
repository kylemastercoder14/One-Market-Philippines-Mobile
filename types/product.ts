export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  images: string[];
  video?: string;
  brand?: string;
  materials: string[];
  weight?: number;
  height?: number;
  price?: number;
  sku: string;
  tags: string[];
  warrantyPeriod?: string;
  warrantyPolicy?: string;
  status: "In stock" | "Out of stock" | string;
  adminApprovalStatus: "Pending" | "Approved" | "Rejected" | string;
  isVariant: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string

  sellerId: string;
  categoryId: string;
  subCategoryId: string;

  discountId?: string;

  sellerProductVariants: SellerProductVariant[];

  /** Seller details */
  seller: Seller;
}

export interface Seller {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  type: string;
  dti?: string;
  bir?: string;
  barangayBusinessPermit?: string;
  identity?: string;
  identityType?: string;
  sec?: string;
  givenName?: string;
  middleName?: string;
  familyName?: string;
  isPremium: boolean;
  businessType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  categorySlug: string;
}

export interface SellerProductVariant {
  id: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
  sellerProductSlug: string;
  sellerProductVariantsOptions: SellerProductVariantOption[];
}

export interface SellerProductVariantOption {
  id: string;
  name: string;
  image?: string;
  price?: number;
  stock?: number;
  createdAt: string;
  updatedAt: string;
  sellerProductVariantsId: string;
}
