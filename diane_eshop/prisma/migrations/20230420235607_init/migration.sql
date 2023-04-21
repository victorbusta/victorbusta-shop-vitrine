-- CreateTable
CREATE TABLE "Admin" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Print" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL,
    "added_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Print_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "print_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "buffer" BYTEA NOT NULL,
    "size" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Format" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "print_id" INTEGER NOT NULL,

    CONSTRAINT "Format_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer_firstname" TEXT NOT NULL,
    "customer_lastname" TEXT NOT NULL,
    "customer_email" TEXT NOT NULL,
    "shipping_adress" TEXT NOT NULL,
    "shipping_postalcode" TEXT NOT NULL,
    "shipping_city" TEXT NOT NULL,
    "shipping" BOOLEAN NOT NULL,
    "shipped" BOOLEAN NOT NULL,
    "validation_token" TEXT,
    "print_id" INTEGER NOT NULL,
    "format_id" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Document_print_id_key" ON "Document"("print_id");

-- CreateIndex
CREATE UNIQUE INDEX "Format_label_key" ON "Format"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Format_size_key" ON "Format"("size");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_print_id_fkey" FOREIGN KEY ("print_id") REFERENCES "Print"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Format" ADD CONSTRAINT "Format_print_id_fkey" FOREIGN KEY ("print_id") REFERENCES "Print"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_print_id_fkey" FOREIGN KEY ("print_id") REFERENCES "Print"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_format_id_fkey" FOREIGN KEY ("format_id") REFERENCES "Format"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
