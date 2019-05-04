#pragma once

#include <QtCore/qglobal.h>

#ifndef BUILD_STATIC
# if defined(HTTPSERVICELIBRARY_LIB)
#  define HTTPSERVICELIBRARY_EXPORT Q_DECL_EXPORT
# else
#  define HTTPSERVICELIBRARY_EXPORT Q_DECL_IMPORT
# endif
#else
# define HTTPSERVICELIBRARY_EXPORT
#endif
